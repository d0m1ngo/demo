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

const ListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ListTableThead = styled.thead``;

const ListTableTh = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
`;

const ListTableTr = styled.tr``;

const ListItemTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ListItemTbody = styled.tbody``;

const ListItemTr = styled.tr`
  cursor: pointer;
`;

const ListItemIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const filterExlcuded = (key, excludeFields) => !excludeFields.includes(key);

const ListItem = ({
  item,
  excludeFields,
  onRedirect,
  showRemove,
  deleteItem,
}) => {
  return (
    <ListItemTr key={item._id} onClick={() => onRedirect(item._id)}>
      {Object.keys(item)
        .filter((key) => filterExlcuded(key, excludeFields))
        .map((key) => {
          return <ListItemTd key={item[key]}>{item[key]}</ListItemTd>;
        })}
      {showRemove && (
        <ListItemTd
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(item._id);
          }}
        >
          <ListItemIconWrapper>
            <Remove width={20} height={20} />
          </ListItemIconWrapper>
        </ListItemTd>
      )}
    </ListItemTr>
  );
};

const List = ({
  header,
  data,
  excludeFields,
  onRedirect,
  showRemove,
  deleteItem,
  onChangeSort,
}) => {
  return (
    <ListTable>
      <ListTableThead>
        <ListTableTr>
          {header.map((item) => (
            <ListTableTh
              key={item}
              onClick={() => {
                onChangeSort(item);
              }}
            >
              {item}
            </ListTableTh>
          ))}
          {showRemove && <ListTableTh>Remove</ListTableTh>}
        </ListTableTr>
      </ListTableThead>
      <ListItemTbody>
        {data.map((item) => (
          <ListItem
            item={item}
            excludeFields={excludeFields}
            onRedirect={onRedirect}
            key={item._id}
            showRemove={showRemove}
            deleteItem={deleteItem}
          />
        ))}
      </ListItemTbody>
    </ListTable>
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
