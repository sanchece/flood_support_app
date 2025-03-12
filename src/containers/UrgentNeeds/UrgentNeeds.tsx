import {tableSortIconStyles } from './styles'

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
import { dataProperties,colors } from '../../globalConstants'

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

export function UrgentNeeds({
  content,
  selectedCategory,
  allData,
  state,
  selectedSubCategory }) {
  const { Table1: tableHeaders, stateLabel } = content
  const selectedStatus = state ? dataProperties.availableStatus : dataProperties.unavailableStatus;
  const filteredTableData = selectedSubCategory ? allData.filter(row => selectedStatus.includes(row.state) && row.category2 === selectedSubCategory):
   selectedCategory? allData.filter(row => row.category1 === selectedCategory && selectedStatus.includes(row.state))
      : allData.filter(row => selectedStatus.includes(row.state));

  const [data, setData] = useState(filteredTableData);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('state');
  const [expandedRows, setExpandedRows] = useState({});
  useEffect(() => {
    setData(filteredTableData);
  }, [selectedCategory,selectedSubCategory, state, content]);
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
    <TableContainer sx={{ maxHeight: 450, border:1, borderColor: colors.defaultIcon }} >
      <Table>
        <TableHead  sx ={{  
}}>
          <TableRow sx={{

            position: 'sticky',
            top: 0,
            backgroundColor: selectedCategory === null? colors.bodyButton1: colors.bodyButton2,
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
            {/* <TableCell sx={{width:'5%'}}/>  */}
          </TableRow>
        </TableHead>
        <TableBody sx={{
          backgroundColor: 'white', // Transparent header
          border: .7, // No borders
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
                  <IconButton sx={{backgroundColor:'#906131', ml:1,p:.1, color:'white'}} onClick={() => handleExpand(index)}>
                    {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton> </Typography>
                </TableCell>
              </TableRow>
              {expandedRows[index] && (
                <TableRow sx={{
                  backgroundColor: '#d9d9d9', // Transparent header
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

export default UrgentNeeds;
