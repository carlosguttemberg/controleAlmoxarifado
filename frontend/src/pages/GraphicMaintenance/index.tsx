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

const GraphicMaintenance: React.FC = () => {
  const [infoGraphic, setInfoGraphic] = useState<ListInfoGraphicData[]>([]);
  const [infoGraphicTypes, setInfoGraphicTypes] = useState<
    ListInfoGraphicData[]
  >([]);
  const [infoGraphicDepartament, setInfoGraphicDepartament] = useState<
    ListInfoGraphicData[]
  >([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [qtdeTotal, setQtdeTotal] = useState(0);

  const handleLoadInfoGraphic = useCallback(async () => {
    const response = await api.get('/maintenances/graphic');
    setInfoGraphic(response.data);
  }, []);

  const handleLoadInfoGraphicTypes = useCallback(async () => {
    const response = await api.get('/maintenances/graphicTypes');
    setInfoGraphicTypes(response.data);
  }, []);

  const handleLoadInfoGraphicDepartament = useCallback(async () => {
    const response = await api.get('/maintenances/graphicDepartament');
    setInfoGraphicDepartament(response.data);
  }, []);

  const handleSumValue = useCallback(() => {
    let valor = 0;

    infoGraphic.forEach(info => {
      valor += info.value;
    });
    setValorTotal(valor);
  }, [infoGraphic]);

  function sum(value: number, value2: number) {
    return +value + +value2;
  }

  const handleSumQtde = useCallback(() => {
    let qtde = 0;

    infoGraphic.forEach(info => {
      qtde = sum(info.qtde, qtde);
    });
    setQtdeTotal(qtde);
  }, [infoGraphic]);

  useEffect(() => {
    handleLoadInfoGraphic();
    handleLoadInfoGraphicTypes();
    handleLoadInfoGraphicDepartament();
    handleSumValue();
    handleSumQtde();
  }, [
    handleLoadInfoGraphic,
    handleLoadInfoGraphicTypes,
    handleLoadInfoGraphicDepartament,
    handleSumValue,
    handleSumQtde,
  ]);

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

          <h2>
            Valor total:&nbsp;
            {formatValue(valorTotal)}
          </h2>

          <h2>
            Qtde total:&nbsp;
            {qtdeTotal}
          </h2>

          <br />

          {infoGraphic.length > 0 && (
            <div style={{ display: 'flex' }}>
              {infoGraphic.map(info => (
                <ContainerList>
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
                <ContainerList>
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
                <ContainerList>
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
