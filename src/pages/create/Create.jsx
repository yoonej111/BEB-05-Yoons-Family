import { PlusOutlined, LoadingOutlined, PoweroffOutlined } from '@ant-design/icons';
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js';
import { Col, Divider, Form, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { loginWarningNoti } from '../../asset/utils/notification';
import NotAuthorized from '../NotAuthorized';
import erc721Abi from '../../erc721Abi';
import * as CreateComp from '../../components/create';

const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN;

//temp function. You can delete this function if you don't need it
const onFinish = (values) => {
  console.log('Success:', values);
};

//temp function. You can delete this function if you don't need it
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  return isJpgOrPng;
};

function Create({ web3, setCollapsed, account }) {
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loadings, setLoadings] = useState([]);

  useEffect(() => {
    !account && loginWarningNoti();
    !account && setCollapsed(false);
  }, []);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImage(info.file.originFileObj);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //민팅
  const onMint = async () => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[1] = true;
      return newLoadings;
    });
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

    const metadata = await client.store({
      name: name,
      description: description,
      image: image,
    });

    console.log('testURL=====', metadata);

    const metadataUrl = `https://ipfs.io/ipfs/${metadata.data.image.pathname}`;
    console.log(metadataUrl);

    const tokenContract = await new web3.eth.Contract(erc721Abi, contract_addr, {
      from: account,
    });

    tokenContract.methods
      .mintNFT(account, `https://ipfs.io/ipfs/${metadata.url.split('//')[1]}`)
      .send({
        from: account,
      });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[1] = false;
        return newLoadings;
      });
    }, 10);
  };

  return !account ? (
    <NotAuthorized />
  ) : (
    <Row justify="center" align="middle">
      <Col flex="0 1 800px">
        <Form
          name="create"
          layout="vertical"
          onValuesChange={() => {}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CreateComp.CreatePageTitle />
          <CreateComp.UploadImage
            beforeUpload={beforeUpload}
            handleChange={handleChange}
            image={image}
            uploadButton={uploadButton}
          />
          <CreateComp.InputName setName={setName} />
          <CreateComp.InputExternalLink />
          <CreateComp.InputDesctiption setDescription={setDescription} />
          <CreateComp.SelectCollection />
          <CreateComp.InputSupply />
          <CreateComp.SelectBlockchain />
          <CreateComp.InputFreezeMetadata />
          <Divider />
          <CreateComp.ButtonMint loading={loadings[1]} onMint={onMint} />
        </Form>
      </Col>
    </Row>
  );
}

export default Create;
