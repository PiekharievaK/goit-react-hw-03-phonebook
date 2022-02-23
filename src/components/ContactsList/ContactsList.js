import PropTypes from 'prop-types';

import s from './ContactsList.module.css';

function ContactsList({ data, deleteFoo, ChangeFoo }) {
  return (
    <ul className={s.list}>
      {data.map(element => {
        return (
          <li key={element.id} className={s.item}>
            <span className={s.contact}>
              <span className={s.name}>{element.name}:</span>
              <span className={s.number}> {optimizePhone(element.number)}</span>
            </span>
            <span className={s.buttonsBox}>
              <button id={element.id} className={s.button} onClick={deleteFoo}>
                Delete
              </button>{' '}
              <button id={element.id} className={s.button} onClick={ChangeFoo}>
                Change
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function optimizePhone(numbertoformat) {
  if (
    (numbertoformat.includes('+') && !numbertoformat.includes('-')) ||
    numbertoformat.length >= 12
  ) {
    const formatNumber = numbertoformat.replace(
      /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
      '$1 ($2) $3-$4-$5'
    );
    return formatNumber;
  } else if (!numbertoformat.includes('-') && numbertoformat.length <= 9) {
    const formatNumber = numbertoformat.replace(
      /(\d{3})(\d{2})(\d{1})/,
      '$1-$2-$3'
    );
    return formatNumber;
  } else if (!numbertoformat.includes('-') && numbertoformat.length >= 10) {
    const formatNumber = numbertoformat.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/,
      '$1-$2-$3-$4'
    );
    return formatNumber;
  } else {
    return numbertoformat;
  }
}

ContactsList.propTypes = {
  data: PropTypes.array.isRequired,
  deleteFoo: PropTypes.func.isRequired,
};

export default ContactsList;
