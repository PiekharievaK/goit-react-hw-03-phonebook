import PropTypes from 'prop-types';
import s from './ContactsFilter.module.css';
function Filter({ value, changeFilter }) {
  return (
    <label className={s.label}>
      <span>Find contacts by name or number</span>
      <input
        type="text"
        name="findField"
        className={s.input}
        value={value}
        onChange={changeFilter}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
export default Filter;
