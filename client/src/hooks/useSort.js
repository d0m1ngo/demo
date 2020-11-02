import { useState } from "react";

export default (initState) => {
  const [sortBy, handleChangeSort] = useState(initState);

  const onChangeSort = (field) => {
    handleChangeSort({ [field]: sortBy[field] === 1 ? -1 : 1 });
  };

  return [sortBy, onChangeSort];
};
