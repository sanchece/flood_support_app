import { tableSortIconStyles, tableCellStyles } from './styles'

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

import { colors } from '../../globalConstants';
import { createGoogleMapLink } from '../../globalHelpers';

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
  const { Table1: tableHeaders } = content
  
  useEffect(() => {
    setData(selectedTableData);
  }, [selectedCategory, selectedSubCategory, state, content, selectedMapPoint]);

  // Sorting function
  const handleSort = (property) => () => {
    const isAsc = (orderBy === property && order === 'asc') || property === 'important';
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
            <TableCell sx={{ p: 1, pl: 7, width: '40%' }}>
              <TableSortLabel
                active={orderBy === 'item'}
                direction={orderBy === 'item' ? order : 'asc'}
                onClick={handleSort('item')}
                sx={tableSortIconStyles}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{tableHeaders.item} </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ p: 1, width: '60%' }}>
              <TableSortLabel
                active={orderBy === 'who'}
                direction={orderBy === 'who' ? order : 'asc'}
                onClick={handleSort('who')}
                sx={{ ...tableSortIconStyles, display: 'flex', flexDirection: 'row-reverse', pr: 8 }}
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
                <TableCell sx={tableCellStyles}>
                  <Box sx={{ display: 'flex', p: 0, pl: row.important === 'TRUE' ? 0 : 3, m: 0 }}>
                    {row.important === 'TRUE' ? <StarIcon fontSize='small' sx={{ pr: .6, color: '#b66547' }} /> : null}
                    <Typography variant="subtitle1"> {row.item}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={tableCellStyles}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="subtitle1"> {row.who}</Typography>
                    <Button sx={{
                      backgroundColor: colors.tableExpandIcon,
                      m: 0, ml: 2, p: 0, minWidth: 0, height: 1,
                      borderRadius: 3,
                      color: 'white',
                    }} onClick={() => handleExpand(index)}>
                      {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              {
                expandedRows[index] && (
                  <TableRow sx={{
                    backgroundColor: row.important === 'TRUE' ? '#e4c9a8' : colors.tableExpandedRow,
                  }}>
                    <TableCell colSpan={1}> <Typography variant="subtitle1" sx={{ whiteSpace: 'pre-line' }}> {row.how} </Typography></TableCell>
                    <TableCell colSpan={2} >
                      <Box sx={{
                        display: 'flex', alignItems: 'flex-end',
                        flexDirection: 'column', pr: 0
                      }}>
                        <Link
                          color="inherit"
                          href={getCellLink('address', row.address)}
                          target="_blank">
                          <Typography variant="subtitle1"> {row.address}</Typography>
                        </Link>
                        <Link
                          color="inherit"
                          href={getCellLink('contact', row.contact)}
                          target="_blank">
                          <Typography variant="subtitle1"> {row.contact} </Typography>
                        </Link>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              }
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default ResourcesTable;
