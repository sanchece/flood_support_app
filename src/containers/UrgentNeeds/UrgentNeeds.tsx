import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Link } from "@mui/material";
import { Data, dataProperties, } from '../../globalConstants'


interface ColumnData {
  dataKey: keyof Data;
  numeric?: boolean;
  width?: number;
}

const columns: ColumnData[] = [
  {
    width: 110,
    dataKey: 'item',
  },
  {
    width: 110,
    dataKey: 'state',
  },
  {
    width: 100,
    dataKey: 'who',
  },
  {
    width: 80,
    dataKey: 'category1',
  },
  {
    width: 80,
    dataKey: 'category2',
  },
  {
    width: 100,
    dataKey: 'address',
  },
  {
    width: 75,
    dataKey: 'accepting',
  },
  {
    width: 70,
    dataKey: 'connect',
  },
  {
    width: 70,
    dataKey: 'contact',
  },
  {
    width: 700,
    dataKey: 'how',
  },
];

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} size="small" />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContentf(tableHeaders) {
  return (
    <TableRow >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width, fontWeight: 'bold', fontSize: '12px' }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {tableHeaders[column.dataKey]}
        </TableCell>
      ))}
    </TableRow>
  );
}

function getCellColor(value: string) {
  let color = '';
  switch (value) {
    case '3':
      color = "#ff5e5e";
      break;
    case '2':
      color = "yellow";
      break;
    case '1':
      color = "#06f305";
      break;
    default:
      color = '';
  }
  return color;
}

function getStateLabel(value: string, stateLabel: string) {
  let label = '';
  switch (value) {
    case '3':
      label = stateLabel[3];
      break;
    case '2':
      label = stateLabel[2];
      break;
    case '1':
      label = stateLabel[1];
      break
    default:
      label = value
  }
  return label;
}

function createGoogleMapLink(address: string) {
  var encodedAddress = encodeURIComponent(address); // Encode address for URL
  return "https://www.google.com/maps/search/?api=1&query=" + encodedAddress;
}

function getCellLink(column: string, value: string) {
  let link = '';
  switch (column) {
    case 'address':
      link = createGoogleMapLink(value);
      break;
    case 'contact':
      if (value === null || value === undefined || value === '') break
      const isInstagram = value[0] === '@'
      if (isInstagram) {
        const user = value.slice(1);
        const igLink = 'https://www.instagram.com/' + user;
        link = igLink;
      }
      else link = undefined
      break;
    default:
      link = undefined
  }
  return link;
}

export function UrgentNeeds({ content, selectedCategory, data, state }) {
  const { Table1:tableHeaders, stateLabel } = content
  const selectedState = state ? dataProperties.availableStatus : dataProperties.unavailableStatus;
  const fixedHeaderContent = () => fixedHeaderContentf(tableHeaders);
  const filteredTableData = selectedCategory
    ? data.filter(row => row.category1 === selectedCategory && selectedState.includes(row.state))
    : data;
  return (
    <Paper elevation={9} style={{ height: 450, width: '100%' }}>
      <TableVirtuoso
        data={filteredTableData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={function rowContent(_index: number, row: Data) {
          return (
            <React.Fragment >
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  align={column.numeric || false ? 'right' : 'left'}
                  style={{
                    fontSize: '12px',
                    backgroundColor: getCellColor(row[column.dataKey])
                  }}
                >{getCellLink(column.dataKey, row[column.dataKey]) === undefined
                  ? getStateLabel(row[column.dataKey], stateLabel)
                  : <Link
                    color="inherit"
                    href={getCellLink(column.dataKey, row[column.dataKey])} target="_blank">
                    {row[column.dataKey]}
                  </Link>
                  }
                </TableCell>
              ))}
            </React.Fragment>
          );
        }}
      />
    </Paper>
  );
}

export default UrgentNeeds;

