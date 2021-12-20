import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sibebar } from '../components/Sidebar';
import dynamic from 'next/dynamic'; 

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },

    zoom: {
      enabled: false,
    },

    foreColor: theme.colors.gray[500],
  },

  grid: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },

  // xaxis: {
  //   type: 'datetime',

  //   axisBorder: {
  //     color: theme.colors.gray[600],
  //   },

  //   axisTicks: {
  //     color: theme.colors.gray[600],
  //   },

  //   categories: [
  //     '2021-12-20T00:00:00.000Z',
  //     '2021-12-21T00:00:00.000Z',
  //     '2021-12-22T00:00:00.000Z',
  //     '2021-12-23T00:00:00.000Z',
  //     '2021-12-24T00:00:00.000Z',
  //     '2021-12-25T00:00:00.000Z',
  //     '2021-12-26T00:00:00.000Z',
  //   ],
  // },

  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  },
};

const series = [{
  name: 'series1', data: [21, 120, 45, 28, 78, 53, 81]
}];

export default function Dashboard() {
  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sibebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart type="area" height="160" options={options} series={series} />
          </Box>

          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart type="area" height="160" options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}