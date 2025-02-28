import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from "@mui/material";
import { dataProperties } from '../../globalConstants'

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
    if (item.status === status) {
      const category = item.itemCategory;

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

export function ResourcesPieChart({ setSelectedCategory, selectedCategory, data }) {
  const availablePieChartData: PieChartData[] = calculateAvailableCount(data, dataProperties.availableStatus);
  const onItemClick = (event, params) => {
    if (selectedCategory !== null && selectedCategory === availablePieChartData[params.dataIndex].label) {
      setSelectedCategory(null)
    }
    else {
      setSelectedCategory(availablePieChartData[params.dataIndex].label)
    }
  };

  return (
    <Box sx={{ display: 'flex' }}    >
      <PieChart
        series={[
          {
            data: availablePieChartData.map(org => {
              if (org.label !== selectedCategory && selectedCategory) {
                return { ...org, color: 'gray', };  // Add color property
              }
              return { ...org, fade: true };  // Keep other objects unchanged
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
      />
    </Box>
  );
}

export default ResourcesPieChart;