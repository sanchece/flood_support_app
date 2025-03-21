import { Box, Button, Typography } from "@mui/material";
import {
  mainCatIcons,
  mainCatIconsContainer,
  resourceSelectionContainer,
  subCatSelection,
  subCatIconsContainer,
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
  data,
  selectedStatusOptions,
  setSelectedMapPoint,
}) {
  const iconButtonOptions = countItems(data, 'category1', 'state', selectedStatusOptions);
  const secondaryOptions = countItems(data, 'category2', 'category1', [selectedCategory]);
  const onMainCatClick = (button) => () => {
    setSelectedMapPoint(undefined)
    if (selectedCategory === button.label) {
      setSelectedCategory(undefined)
    } else {
      setSelectedCategory(button.label)
      setSelectedSubCategory(undefined)
    }
  };

  const onSubCatClick = (button) => () => {
    setSelectedMapPoint(undefined)
    if (selectedSubCategory !== undefined && selectedSubCategory === button.label) {
      setSelectedSubCategory(undefined)
    } else {
      setSelectedSubCategory(button.label)
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
            <Typography sx={{
              fontWeight: selectedCategory === button.label ? 800 : 400,
            }} variant="body2">{button.label}</Typography>

          </Button>
        ))}
      </Box>
      <Box sx={subCatIconsContainer}>
        {secondaryOptions.map((button) => (
          <Button
            key={button.id}
            sx={subCatSelection(selectedSubCategory === button.label)}
            onClick={onSubCatClick(button)}
          >
            <Typography
              sx={{
                fontWeight: selectedSubCategory === button.label ? 800 : 400,
              }}
              variant="body2">{button.label}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default ResourceSelection;