import { tableSortIconStyles } from './styles'

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Chip,
  Typography,
} from '@mui/material';
import { Link } from "@mui/material";

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { colors } from '../../globalConstants'
import { createGoogleMapLink } from '../../globalHelpers'

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

function getCellColor(value: string) {
  let color = '';
  switch (value) {
    case '3':
      color = "#ff3131";
      break;
    case '2':
      color = "#f67e34";
      break;
    case '1':
      color = "#00bf63";
      break;
    default:
      color = '';
  }
  return color;
}

export function ResourcesTable({
  content,
  selectedCategory,
  selectedSubCategory,
  selectedTableData,
  state,
  selectedMapPoint,
}) {
  const [data, setData] = useState(selectedTableData);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('state');
  const [expandedRows, setExpandedRows] = useState({});
  const { Table1: tableHeaders, stateLabel } = content

  useEffect(() => {
    setData(selectedTableData);
  }, [selectedCategory, selectedSubCategory, state, content,selectedMapPoint ]);

  // Sorting function
  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedData = [...data].sort((a, b) => {
      if (isAsc) {
        return b[property].localeCompare(a[property]);
      }
      return a[property].localeCompare(b[property]);
    });
    setData(sortedData);
  };

  // Toggle row expansion
  const handleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <TableContainer sx={{ maxHeight: 450, border: 1, borderColor: colors.defaultIcon }} >
      <Table>
        <TableHead sx={{
        }}>
          <TableRow sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: selectedCategory === undefined ? colors.bodyButton1 : colors.bodyButton2,
            zIndex: 1,
          }}>
            <TableCell sx={{ width: '30%' }}>
              <TableSortLabel
                active={orderBy === 'state'}
                direction={orderBy === 'state' ? order : 'asc'}
                onClick={handleSort('state')}
                sx={tableSortIconStyles}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}> {tableHeaders.state} </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ width: '40%' }}>
              <TableSortLabel
                active={orderBy === 'item'}
                direction={orderBy === 'item' ? order : 'asc'}
                onClick={handleSort('item')}
                sx={tableSortIconStyles}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}> {tableHeaders.item} </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ width: '25%' }}>
              <TableSortLabel
                active={orderBy === 'who'}
                direction={orderBy === 'who' ? order : 'asc'}
                onClick={handleSort('who')}
                sx={tableSortIconStyles}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}> {state === true ? tableHeaders.whoHas : tableHeaders.whoNeed} </Typography>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{
          backgroundColor: 'white',
          border: .7,
          borderColor: '#d9d9d9',
        }}>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  <Chip sx={{ width: '100%', backgroundColor: getCellColor(row.state) }} label={<Typography variant="body2"> {getStateLabel(row.state, stateLabel)} </Typography>} />
                </TableCell>
                <TableCell><Typography variant="body2"> {row.item} </Typography></TableCell>
                <TableCell><Typography variant="body2"> {row.who}
                  <IconButton sx={{ backgroundColor: colors.tableExpandIcon, ml: 1, p: .1, color: 'white' }} onClick={() => handleExpand(index)}>
                    {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton> </Typography>
                </TableCell>
              </TableRow>
              {expandedRows[index] && (
                <TableRow sx={{
                  backgroundColor: colors.tableExpandedRow,
                }}>
                  <TableCell ><Link
                    color="inherit"
                    href={getCellLink('address', row.address)}
                    target="_blank">
                    <Typography variant="body2"> {row.address} </Typography>
                  </Link></TableCell>
                  <TableCell >
                    <Link
                      color="inherit"
                      href={getCellLink('contact', row.contact)}
                      target="_blank">
                      <Typography variant="body2"> {row.contact} </Typography>
                    </Link></TableCell>
                  <TableCell colSpan={2}> <Typography variant="body2"> {row.how} </Typography></TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResourcesTable;
