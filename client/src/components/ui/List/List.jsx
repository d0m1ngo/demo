/* eslint-disable consistent-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as Remove } from "../../../images/remove.svg";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TD = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TH = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
  border: 1px solid #ddd;
  padding: 8px;
`;

const TR = styled.tr`
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const filterExlcuded = (key, excludeFields) => !excludeFields.includes(key);

const TableItem = ({
  item,
  excludeFields,
  onRedirect,
  showRemove,
  deleteItem,
}) => {
  return (
    <TR key={item._id} onClick={() => onRedirect(item._id)}>
      {Object.keys(item)
        .filter((key) => filterExlcuded(key, excludeFields))
        .map((key) => {
          return <TD key={item[key]}>{item[key]}</TD>;
        })}
      {showRemove && (
        <TD
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(item._id);
          }}
        >
          <IconWrapper>
            <Remove width={20} height={20} />
          </IconWrapper>
        </TD>
      )}
    </TR>
  );
};

const List = ({
  header,
  data,
  excludeFields,
  onRedirect,
  showRemove,
  deleteItem,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          {header.map((item) => (
            <TH key={item}>{item}</TH>
          ))}
          {showRemove && <TH>Remove</TH>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableItem
            item={item}
            excludeFields={excludeFields}
            onRedirect={onRedirect}
            key={item._id}
            showRemove={showRemove}
            deleteItem={deleteItem}
          />
        ))}
      </tbody>
    </Table>
  );
};

List.propTypes = {
  onRedirect: PropTypes.func,
  showRemove: PropTypes.bool,
};

List.defaultProps = {
  onRedirect: () => {},
  showRemove: false,
};

export default List;
