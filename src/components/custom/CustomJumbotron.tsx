interface Props {
  titulo: string;
  descripcion: string;
}

export const CustomJumbotron = ({ titulo, descripcion }: Props) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {titulo}
      </h1>

      {descripcion && (
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          {descripcion}
        </p>
      )}
    </div>
  );
};
