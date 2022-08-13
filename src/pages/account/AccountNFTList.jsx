import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import CollectionPreview from '../../components/CollectionPreview ';

function AccountNFTList({ collectionData, web3, account }) {
  useEffect(() => {}, [collectionData]);
  return (
    <Row gutter={[16, 16]}>
      {collectionData.map((_, idx) => {
        return (
          <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
            <CollectionPreview
              key={Symbol(idx + 1).toString()}
              collectionData={_}
              web3={web3}
              account={account}
            ></CollectionPreview>
          </Col>
        );
      })}
    </Row>
  );
}

export default AccountNFTList;
