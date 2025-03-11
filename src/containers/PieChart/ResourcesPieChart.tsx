import { PieChart, } from '@mui/x-charts/PieChart';
import { Box, Button, Typography } from "@mui/material";
import { dataProperties } from '../../globalConstants'
import { mainCatIcons } from './styles';
interface PieChartData {
  id: number;
  value: number;
  label: string;
}

function calculateAvailableCount(data, status) {
  // Step 1: Initialize an empty object to hold the counts for each category
  const categoryCounts = {};

  // Step 2: Iterate over the data and count only the "Have Available" items per category
  data.forEach(item => {
    if (status.includes(item.state)) {
      const category = item.category1;

      // If the category already exists in categoryCounts, increment the count
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        // If it's the first occurrence of the category, initialize the count as 1
        categoryCounts[category] = 1;
      }
    }
  });

  // Step 3: Convert the counts object into the desired array format
  const availableCount = Object.keys(categoryCounts).map((key, index) => ({
    id: index,
    label: key,
    value: categoryCounts[key],
  }));

  return availableCount;
}

export function ResourcesPieChart({ setSelectedCategory, selectedCategory, state, data }) {
  const selectedState = state ? dataProperties.availableStatus : dataProperties.unavailableStatus;

  const availablePieChartData: PieChartData[] = calculateAvailableCount(data, selectedState);
  console.log('availablePieChartData', availablePieChartData)
  const onItemClick = (event, params) => {
    if (selectedCategory !== null && selectedCategory === availablePieChartData[params.dataIndex].label) {
      setSelectedCategory(null)
    }
    else {
      setSelectedCategory(availablePieChartData[params.dataIndex].label)
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', alignItems: 'center' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '6rem'

      }}>
        {availablePieChartData.map((button) => (
          <Button
            key={button.id}
            sx={mainCatIcons(selectedCategory === button.label)}
            onClick={() => setSelectedCategory(button.label)}  // Update state on click

          >
            <Typography variant="body2">{button.label}</Typography>
          </Button>
        ))}
      </Box>
      {/* <PieChart
        sx={{ '&&': { touchAction: 'auto' } }}
        series={[
          {
            data: availablePieChartData.map(item => {
              if (item.label !== selectedCategory && selectedCategory) {
                return { ...item, color: 'gray', };  // Add color property
              }
              return { ...item, };  // Keep other objects unchanged
            }),
            innerRadius: 80,
            paddingAngle: 0,
            cornerRadius: 2,
          },
        ]}
        width={450}
        height={270}
        colors={[
          '#AA0815',
          '#EF5322',
          '#F0B41C',
          '#49B6A9',
          '#3D9BE1',
          '#263793',
          '#4B0A80',
          '#36454F',
          '#00919E',
          '#45B8A7'
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 12,
              fill: 'black',
            },
            position: { vertical: 'middle', horizontal: 'right' },
            padding: 0,
          },
        }}
        tooltip={{ trigger: 'none' }}
        onItemClick={onItemClick}
      /> */}
    </Box>
  );
}

export default ResourcesPieChart;