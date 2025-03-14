import { PieChart, } from '@mui/x-charts/PieChart';
import { Box, Button, Typography } from "@mui/material";
import { colors } from '../../globalConstants'
import {
  mainCatIcons,
  mainCatIconsContainer,
  resourceSelectionContainer,
} from './styles';
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

export function ResourceSelection({
  setSelectedSubCategory,
  selectedSubCategory,
  setSelectedCategory,
  selectedCategory,
  allData,
  selectedStatusOptions,
}) {
  const iconButtonOptions = countItems(allData, 'category1', 'state', selectedStatusOptions);
  const secondaryOptions = countItems(allData, 'category2', 'category1', [selectedCategory]);

  const onMainCatClick = (button) => () => {
    if (selectedCategory === button.label) {
      setSelectedCategory(undefined)
    } else {
      setSelectedCategory(button.label)
      setSelectedSubCategory(undefined)
    }
  };

  const onSubCatClick = (event, params) => {
    if (selectedSubCategory !== undefined && selectedSubCategory === secondaryOptions[params.dataIndex].label) {
      setSelectedSubCategory(undefined)
    } else {
      setSelectedSubCategory(secondaryOptions[params.dataIndex].label)
    }
  };

  return (
    <Box sx={resourceSelectionContainer}>
      <Box sx={mainCatIconsContainer}>
        {iconButtonOptions.map((button) => (
          <Button
            key={button.id}
            sx={mainCatIcons(selectedCategory === button.label)}
            onClick={onMainCatClick(button)}
          >
            <img src={iconMap[button.label]} alt={button.label} width={35} height={35} />
            <Typography variant="body2">{button.label}</Typography>

          </Button>
        ))}
      </Box>
      {selectedCategory !== undefined
        ? <PieChart
          sx={{ '&&': { touchAction: 'auto' } }}
          margin={{
            left: -40, // Negative value moves the pie left
          }}
          series={[
            {
              data: secondaryOptions.map(item => {
                if (item.label !== selectedSubCategory && selectedSubCategory) {
                  return { ...item, color: 'gray', };  // Add color property
                }
                return { ...item, };  // Keep other objects unchanged
              }),
              innerRadius: 40,
              paddingAngle: 0,
              cornerRadius: 3,
              outerRadius: 80,
            },
          ]}
          width={340}
          height={210}
          colors={colors.pieChart}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 10,
                fill: 'black',
              },
              position: { vertical: 'middle', horizontal: 'right' },
              padding: 0,
            },
          }}
          tooltip={{ trigger: 'none' }}
          onItemClick={onSubCatClick}
        />
        : <></>}
    </Box>
  );
}

export default ResourceSelection;