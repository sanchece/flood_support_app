import { tableSortIconStyles, tableCellStyles } from './styles'

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
  Paper,
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
  }, [selectedCategory, selectedSubCategory, state, content, selectedMapPoint]);

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
    <TableContainer>
      <Table>
        <TableHead sx={{ height: '12px' }}>
          <TableRow sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: colors.bodyBackground,
            zIndex: 1,
            height: '12px'
          }}>
            <TableCell sx={{ p: 1, pl: 10, width: '40%' }}>
              <TableSortLabel
                active={orderBy === 'item'}
                direction={orderBy === 'item' ? order : 'asc'}
                onClick={handleSort('item')}
                sx={tableSortIconStyles}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{tableHeaders.item} </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ p: 1, width: '25%' }}>
              <TableSortLabel
                active={orderBy === 'who'}
                direction={orderBy === 'who' ? order : 'asc'}
                onClick={handleSort('who')}
                sx={tableSortIconStyles}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}> {state === true ? tableHeaders.whoHas : tableHeaders.whoNeed} </Typography>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }}>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell sx={{ ...tableCellStyles, pl: 5 }}>
                  {/* <Paper variant='elevation' sx={{
                    height: 30, color: 'white', borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    elevation: 24, width: '90%', backgroundColor: getCellColor(row.state)
                  }}> */}
                  <Typography variant="subtitle1"> {row.item} </Typography>
                  {/* </Paper> */}
                </TableCell>
                <TableCell sx={tableCellStyles}><Typography variant="subtitle1"> {row.who}
                  <Button sx={{
                    backgroundColor: colors.tableExpandIcon,
                    ml: 4, p: 0, px: 0, minWidth: 0,
                    borderRadius: 3,
                    color: 'white',
                  }} onClick={() => handleExpand(index)}>
                    {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                  </Button> </Typography>
                </TableCell>
              </TableRow>
              {expandedRows[index] && (
                <TableRow sx={{
                  backgroundColor: colors.tableExpandedRow,
                }}>
                  <TableCell colSpan={1}> <Typography variant="subtitle1"> {row.how} </Typography></TableCell>
                  <TableCell colSpan={2} >
                    <Link
                      color="inherit"
                      href={getCellLink('address', row.address)}
                      target="_blank">
                      <Typography variant="subtitle1"> {row.address} </Typography>
                    </Link>
                    <Link
                      color="inherit"
                      href={getCellLink('contact', row.contact)}
                      target="_blank">
                      <Typography variant="subtitle1"> {row.contact} </Typography>
                    </Link>
                  </TableCell>
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
