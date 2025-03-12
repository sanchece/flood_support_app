import { PieChart, } from '@mui/x-charts/PieChart';
import { Box, Button, Typography } from "@mui/material";
import { dataProperties } from '../../globalConstants'
import { mainCatIcons } from './styles';
import Food from '../../assets/food.svg'; // Adjust the path accordingly
import Info from '../../assets/info.svg'; // Adjust the path accordingly
import Service from '../../assets/service.svg'; // Adjust the path accordingly
import Shelter from '../../assets/shelter.svg'; // Adjust the path accordingly
import Supplies from '../../assets/supplies.svg'; // Adjust the path accordingly

const iconMap = {
  Alimento: Food,
  Food,
  Info,
  Información: Info,
  Refugio: Shelter,
  Service,
  Servicio: Service,
  Shelter,
  Suministros: Supplies,
  Supplies,
}

function countItems(data, label, keyForCondition, validKeyValues) {
  // Create a map to store counts for each category
  const countMap = new Map();

  // Filter data based on validKeyValues and count categories
  data.forEach(obj => {
    // Check if the object's keyForCondition value is in validKeyValues
    if (validKeyValues.includes(obj[keyForCondition])) {
      const categoryValue = obj[label];
      countMap.set(categoryValue, (countMap.get(categoryValue) || 0) + 1);
    }
  });

  // Convert map to array of objects with id, label, and value
  const result = Array.from(countMap.entries()).map(([category, count], index) => ({
    id: index,
    label: category,
    value: count
  }));

  return result;
}

export function ResourcesPieChart({ setSelectedSubCategory, selectedSubCategory, setSelectedCategory, selectedCategory, state, allData }) {
  const selectedState = state ? dataProperties.availableStatus : dataProperties.unavailableStatus;
  const filteredTableData = selectedCategory
    ? allData.filter(row => row.category1 === selectedCategory && selectedState.includes(row.state))
    : allData.filter(row => selectedState.includes(row.state));
  const availablePieChartData = countItems(allData, 'category1', 'state', selectedState);
  const availablePieChartData2 = countItems(filteredTableData, 'category2', 'category1', [selectedCategory]);

  const onSubCatClick = (event, params) => {
    if (selectedSubCategory !== null && selectedSubCategory === availablePieChartData2[params.dataIndex].label) {
      setSelectedSubCategory(null)
    }
    else {
      setSelectedSubCategory(availablePieChartData2[params.dataIndex].label)
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: '6rem'

      }}>
        {availablePieChartData.map((button) => (
          <Button
            key={button.id}
            sx={mainCatIcons(selectedCategory === button.label)}
            onClick={() => {
              if (selectedCategory === button.label) {
                setSelectedCategory(null)
              } else {
                setSelectedCategory(button.label)
                setSelectedSubCategory(null)
              }
            }
            }
          >
            <img src={iconMap[button.label]} alt={button.label} width={35} height={35} />
            <Typography variant="body2">{button.label}</Typography>

          </Button>
        ))}
      </Box>
      {selectedCategory !== null ? <PieChart
        sx={{ '&&': { touchAction: 'auto' } }}
        series={[
          {
            data: availablePieChartData2.map(item => {
              if (item.label !== selectedSubCategory && selectedSubCategory) {
                return { ...item, color: 'gray', };  // Add color property
              }
              return { ...item, };  // Keep other objects unchanged
            }),
            innerRadius: 55,
            paddingAngle: 0,
            cornerRadius: 3,
          },
        ]}
        width={450}
        height={200}
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
        onItemClick={onSubCatClick}
      /> : <></>}
    </Box>
  );
}

export default ResourcesPieChart;