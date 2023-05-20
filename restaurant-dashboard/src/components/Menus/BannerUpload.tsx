import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';

const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

interface IProps {
  setFileList: React.Dispatch<React.SetStateAction<RcFile[]>>;
}

export default function BannerUpload({ setFileList }: IProps) {
  const props: UploadProps = {
    multiple: true,
    onRemove: (file: UploadFile<any>) => {
      setFileList((state) => state.filter((f) => f.name !== file.name));
    },
    beforeUpload: (file: RcFile) => {
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        message.error(`${file.name} is not a valid file type`);
        return Upload.LIST_IGNORE;
      }
      setFileList((state) => state.concat(file));
      return false;
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
}
