import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BiDownArrow } from 'react-icons/bi';
import { SelectStyle, Value, DropDown, Item } from '@/components/Select/styled';

export default function Select({
  options,
  onChange,
  defaultValue,
  back,
  maxWidth,
  color,
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectChange = (id, name, logo) => {
    setValue(name);
    onChange(id, name, logo && logo[0].url);
  };

  return (
    <SelectStyle
      height={options.length * 28.5}
      maxWidth={maxWidth}
      color={color}
    >
      <Value>{value}</Value>
      <BiDownArrow size={20} />
      <DropDown className="dropDown" back={back}>
        {options.map(({ id, name, logo, position }) => (
          <Item
            key={id}
            onClick={() => handleSelectChange(id, name || position, logo)}
          >
            {name || position}
          </Item>
        ))}
      </DropDown>
    </SelectStyle>
  );
}

Select.defaultProps = {
  back: null,
  maxWidth: false,
  color: null,
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  back: PropTypes.string,
  maxWidth: PropTypes.bool,
  color: PropTypes.string,
};
