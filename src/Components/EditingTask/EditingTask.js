import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function EditingTask({ submitEditedTask, onCloseEditingMode, description }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(description);
  }, []);

  return (
    <form
      className="submitForm"
      onSubmit={(e) => {
        submitEditedTask(e, value);
        setValue('');
      }}
    >
      <input
        className="edit"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => (e.key === 'Escape' ? onCloseEditingMode() : null)}
        onBlur={onCloseEditingMode}
        value={value}
        autoFocus
      />
    </form>
  );
}

EditingTask.propTypes = {
  description: PropTypes.string,
  submitEditedTask: PropTypes.func.isRequired,
  onCloseEditingMode: PropTypes.func.isRequired,
};

EditingTask.defaultProps = {
  description: '',
};

export default EditingTask;
