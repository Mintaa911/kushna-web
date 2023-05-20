import { Row, Col, Card } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import BasicCard from '../components/common/BasicCard';
import useBreakpoint from '../hooks/UseBreakpoint';
import { ChartData1, ChartData2 } from '../data/SampleData';
import OrderBarChart from '../components/dashboard/BarChart';
import OrderPieChart from '../components/dashboard/PieChart';
import LineChart from '../components/dashboard/LineChart';

const Dashboard = () => {
  const breakpoint = useBreakpoint();
  return (
    <div style={{}}>
      <h1>Dashboard</h1>
      <Row gutter={{ xs: 4, sm: 6, md: 32 }} wrap style={{}}>
        <Col span={6}>
          <BasicCard stat={1020} label={'Orders'} icon={<BarChartOutlined style={{ fontSize: breakpoint > 768 ? '48px' : '12px' }} />} />
        </Col>
        <Col span={6}>
          <BasicCard stat={30} label={'Restaurants'} icon={<BarChartOutlined style={{ fontSize: '48px' }} />} />
        </Col>
        <Col span={6}>
          <BasicCard stat={320} label={'Customers'} icon={<BarChartOutlined style={{ fontSize: '48px' }} />} />
        </Col>
        <Col span={6}>
          <BasicCard stat={20} label={'Delivery Person'} icon={<BarChartOutlined style={{ fontSize: '48px' }} />} />
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card style={{ paddingLeft: 20 }} bodyStyle={{ padding: '0' }}>
            <h1>Order From Head Quarter</h1>
            <OrderPieChart data={ChartData2} />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ paddingLeft: 20 }} bodyStyle={{ padding: '0' }}>
            <h1>Order from Hotel</h1>
            <OrderBarChart data={ChartData1} />
          </Card>
        </Col>
      </Row>
      <Card
        bodyStyle={{ padding: '0' }}
        style={{
          marginTop: 20,
          paddingLeft: 20,
        }}
      >
        <h1>Order Distribution Over the Week</h1>
        <LineChart data={ChartData1} />
      </Card>
    </div>
  );
};

export default Dashboard;
