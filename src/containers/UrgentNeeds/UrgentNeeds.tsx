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
import { MainPageTable, dataProperties, Data } from '../../globalConstants'


interface ColumnData {
  dataKey: keyof Data;
  numeric?: boolean;
  width?: number;
}

const columns: ColumnData[] = [
  {
    width: 100,
    dataKey: 'item',
  },
  {
    width: 100,
    dataKey: 'status',
  },
  {
    width: 110,
    dataKey: 'location',
  },
  {
    width: 100,
    dataKey: 'hours',
  },
  {
    width: 70,
    dataKey: 'organization',
  },
  {
    width: 100,
    dataKey: 'social',
  },
  {
    width: 90,
    dataKey: 'phone',
  },
  {
    width: 75,
    dataKey: 'datePosted',
  },
  {
    width: 70,
    dataKey: 'notes',
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
    case 'Urgently Needed':
      color = "#ff5e5e";
      break;
    case dataProperties.availableStatus:
      color = "#06f305";
      break;
    default:
      color = ''
  }
  return color;
}

function createGoogleMapLink(address: string) {
  var encodedAddress = encodeURIComponent(address + 'Detroit MI 48209'); // Encode address for URL
  return "https://www.google.com/maps/search/?api=1&query=" + encodedAddress;
}

function getCellLink(column: string, value: string) {
  let link = '';
  switch (column) {
    case 'location':
      link = createGoogleMapLink(value);
      break;
    case 'social':
      const user = value.slice(1);
      const igLink = 'https://www.instagram.com/' + user;
      link = igLink;
      break;
    default:
      link = undefined
  }
  return link;
}

function rowContent(_index: number, row: Data) {
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
        >{getCellLink(column.dataKey, row[column.dataKey]) === undefined ? row[column.dataKey]
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
}

export function UrgentNeeds({ tableHeaders, selectedCategory, data }: { tableHeaders: MainPageTable, selectedCategory: string | null, data: any }) {
  const fixedHeaderContent = () => fixedHeaderContentf(tableHeaders);
  const filteredTableData = selectedCategory
  ? data.filter(row => row.itemCategory === selectedCategory && row.status ===dataProperties.availableStatus)
  : data;
  return (
    <Paper elevation={5} style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={filteredTableData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default UrgentNeeds;

