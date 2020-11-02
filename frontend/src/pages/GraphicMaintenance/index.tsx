import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  AnimationContainer,
  Header,
  Content,
  ContainerList,
} from './styles';

interface ListInfoGraphicData {
  id: string;
  name: string;
  qtde: number;
  value: number;
}

interface ListInfoGraphicStatusData {
  qtde_realizadas: number;
}

interface ListInfoGraphicTotalsData {
  qtde_total: number;
  valor_total: number;
}

const GraphicMaintenance: React.FC = () => {
  const [infoGraphic, setInfoGraphic] = useState<ListInfoGraphicData[]>([]);

  const [infoGraphicTotals, setInfoGraphicTotals] = useState<
    ListInfoGraphicTotalsData
  >();

  const [infoGraphicStatus, setInfoGraphicStatus] = useState<
    ListInfoGraphicStatusData
  >();

  const [infoGraphicTypes, setInfoGraphicTypes] = useState<
    ListInfoGraphicData[]
  >([]);

  const [infoGraphicDepartament, setInfoGraphicDepartament] = useState<
    ListInfoGraphicData[]
  >([]);

  const handleLoadInfoGraphicStatus = useCallback(async () => {
    const response = await api.get('/maintenances/graphicStatus');
    setInfoGraphicStatus(response.data);
  }, []);

  const handleLoadInfoGraphicTypes = useCallback(async () => {
    const response = await api.get('/maintenances/graphicTypes');
    setInfoGraphicTypes(response.data);
  }, []);

  const handleLoadInfoGraphicDepartament = useCallback(async () => {
    const response = await api.get('/maintenances/graphicDepartament');
    setInfoGraphicDepartament(response.data);
  }, []);

  const handleLoadInfoGraphic = useCallback(async () => {
    const response = await api.get('/maintenances/graphic');
    setInfoGraphic(response.data);
  }, []);

  const handleLoadInfoGraphicTotals = useCallback(async () => {
    const response = await api.get('/maintenances/graphicTotals');
    setInfoGraphicTotals(response.data);
  }, []);

  useEffect(() => {
    handleLoadInfoGraphic();
    handleLoadInfoGraphicTypes();
    handleLoadInfoGraphicDepartament();
    handleLoadInfoGraphicStatus();
    handleLoadInfoGraphicTotals();
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Header>
            <Header>
              <Link to="/">
                <FiArrowLeft size={30} />
              </Link>
              <h1>Gráfico de manutenções</h1>
            </Header>

            <div
              style={{
                display: 'flex',
                width: '200px',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/maintenance">
                <h3>
                  <FiPlus style={{ marginRight: '5px' }} />
                  Novo
                </h3>
              </Link>
            </div>
          </Header>

          <hr />
          {infoGraphicTotals && infoGraphicStatus && (
            <div>
              <h2>
                Valor total:&nbsp;
                {formatValue(infoGraphicTotals.valor_total)}
              </h2>

              <h2>
                Qtde total:&nbsp;
                {infoGraphicTotals.qtde_total}
              </h2>

              <h2>
                Percentual Realizações:&nbsp;
                {(
                  (infoGraphicStatus.qtde_realizadas /
                    infoGraphicTotals.qtde_total) *
                  100
                ).toFixed(2)}
                %
              </h2>
            </div>
          )}
          <br />

          {infoGraphic.length > 0 && (
            <div style={{ display: 'flex' }}>
              {infoGraphic.map(info => (
                <ContainerList key={info.name}>
                  {`${info.name}(${info.qtde})`}
                  <br />
                  {formatValue(info.value)}
                </ContainerList>
              ))}
            </div>
          )}

          {infoGraphic.length > 0 && (
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                height: '400px',
              }}
            >
              <div
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={infoGraphic}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          )}

          <h1>Gráfico de tipos de manutenções</h1>
          <hr />

          {infoGraphicTypes.length > 0 && (
            <div style={{ display: 'flex' }}>
              {infoGraphicTypes.map(info => (
                <ContainerList key={info.name}>
                  {`${info.name}(${info.qtde})`}
                  <br />
                  {formatValue(info.value)}
                </ContainerList>
              ))}
            </div>
          )}

          {infoGraphicTypes.length > 0 && (
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                height: '400px',
              }}
            >
              <div
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={infoGraphicTypes}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          )}

          <h1>Gráfico de manutenções por departamento</h1>
          <hr />

          {infoGraphicDepartament.length > 0 && (
            <div style={{ display: 'flex' }}>
              {infoGraphicDepartament.map(info => (
                <ContainerList key={info.name}>
                  {`${info.name}(${info.qtde})`}
                  <br />
                  {formatValue(info.value)}
                </ContainerList>
              ))}
            </div>
          )}

          {infoGraphicDepartament.length > 0 && (
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                height: '400px',
              }}
            >
              <div
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={infoGraphicDepartament}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default GraphicMaintenance;
