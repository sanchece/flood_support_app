import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { urgentNeeds } from './data';

import { MainPageTable } from '../../globalConstants'
interface Data {
  datePosted: string;
  organization: string;
  item: string;
  notes: string;
  status: string;
  location: string;
  hours: string;
  social: string;
  phone: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
}


const columns: ColumnData[] = [
  {
    width: 75,
    label: 'Date Posted',
    dataKey: 'datePosted',
  },

  {
    width: 100,
    label: 'Item',
    dataKey: 'item',
  },
  {
    width: 70,
    label: 'Note',
    dataKey: 'notes',
  },
  {
    width: 100,
    label: 'Status',
    dataKey: 'status',
  },
  {
    width: 110,
    label: 'Drop Off',
    dataKey: 'location',
  },
  {
    width: 100,
    label: 'Hours',
    dataKey: 'hours',
  },
  {
    width: 70,
    label: 'Organization',
    dataKey: 'organization',
  },
  {
    width: 100,
    label: 'Social',
    dataKey: 'social',
  },
  {
    width: 90,
    label: 'Phone',
    dataKey: 'phone',
  },
];
const rows: Data[] = urgentNeeds;

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
    case 'Have Available':
      color = "#06f305";
      break;
    default:
      color = ''
  }
  return color;
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
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export function UrgentNeeds({ tableHeaders }: { tableHeaders: MainPageTable }) {
  const fixedHeaderContent = () => fixedHeaderContentf(tableHeaders);
  return (
    <Paper elevation={5} style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default UrgentNeeds;

