import PropTypes from 'prop-types';
import {
  Main,
  CardNews,
  CardImage,
  Info,
  NoData,
} from '@/sections/Home/styled';

export default function Home({ news, status, token }) {
  const notifications =
    news.length === 0 ? (
      <NoData>
        {status === 200
          ? 'Поки що новин не має'
          : 'На сервері щось пішло не так, вибачте за незручності!'}
      </NoData>
    ) : (
      news.map(({ id, title, description, photo, date }) => (
        <CardNews key={id} href={`/news/${id}`} src={photo?.url}>
          {photo && (
            <CardImage
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo[0]?.url}`}
              alt={title}
              fill
            />
          )}
          <Info>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{date}</span>
          </Info>
        </CardNews>
      ))
    );

  return (
    <Main>
      {token ? (
        notifications
      ) : (
        <NoData>Увійдіть в обліоквий запис щоб бачити новини</NoData>
      )}
    </Main>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      photo: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          url: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
      date: PropTypes.string,
    }),
  ).isRequired,
  status: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};
