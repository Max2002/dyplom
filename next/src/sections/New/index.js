import PropTypes from 'prop-types';
import {
  Wrapper,
  Image,
  Info,
  Title,
  Description,
} from '@/sections/New/styled';

export default function New({
  data: {
    title,
    description,
    date,
    photo: { data },
  },
}) {
  return (
    <Wrapper>
      <Image
        url={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data[0].attributes.url}`}
      />
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <div>Ця подія відбудеться {date}</div>
      </Info>
    </Wrapper>
  );
}

New.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    photo: PropTypes.object,
  }).isRequired,
};
