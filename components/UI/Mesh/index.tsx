import { FC } from "react";

interface MeshProps{
  dotSize?: number;
  rows?: number;
  columns?: number;
  gap?: number;
  className?:string;
}

const Mesh: FC<MeshProps> = ({
  dotSize = 1,
  rows = 13,
  columns = 13,
  gap = 40,
  className = ''
}) => {
  const width = (columns - 1) * gap;
  const height = (rows - 1) * gap;

  const dotElements = [];

  let xPosition = 0;
  for (let i = 0; i < columns; i++) {
    let yPosition = 0;
    for (let j = 0; j < rows; j++) {
      dotElements.push(<rect key={`${i} ${j}`} width={dotSize} height={dotSize} x={xPosition} y={yPosition}/>)
      yPosition += gap;
    }
    xPosition += gap;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} className={className} >
      {dotElements}
    </svg>
  );
};

export default Mesh;
