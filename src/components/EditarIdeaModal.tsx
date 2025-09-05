import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Save,
  AlertCircle,
  Upload,
  File,
  Trash2,
  Image,
  FileText,
  Sheet,
  Tag,
  MapPin,
} from "lucide-react";

interface Idea {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado:
    | "Abierta"
    | "Revision"
    | "CoDir"
    | "Aprobada"
    | "Progreso"
    | "Implementada"
    | "Rechazada";
  planta: string;
  fechaCreacion: string;
  votos: number;
  comentarios: number;
  impactoEstimado: string;
  ahorroPotencial?: string;
  archivos?: any[];
}

interface EditarIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ideaEditada: Partial<Idea>) => void;
  idea: Idea | null;
}

interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  archivo: File;
}

const EditarIdeaModal: React.FC<EditarIdeaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  idea,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    planta: "",
    archivos: [] as ArchivoAdjunto[],
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categorias = [
    "General",
    "Comercial",
    "Compras",
    "Eficiencia Energética",
    "Logística",
    "Producción",
    "Redes",
    "Ciberseguridad",
    "ERP",
    "RRHH",
    "Seguridad-PRL",
    "Otra",
  ];

  const plantas = [
    "AGSA",
    "Alter Enersun",
    "Alterna",
    "Arlanzón",
    "Azpeitia",
    "Balboa",
    "Bigues",
    "Centro de Servicios",
    "CLGI",
    "CL Solar",
    "Cristian Lay DSS",
    "Ferromallas",
    "Galvacolor",
    "Gas Extremadura",
    "GES",
    "Fundación Ricardo Leal",
    "Gasiluz",
    "Iqlit",
    "Iqoxe",
    "Industrias Cristian Lay",
    "Lasao",
    "Laytours",
    "Marceliano Martín",
    "MGT",
    "Murcia Cartón",
    "Omega",
    "Ondumaroc",
    "Ondupack Almendralejo",
    "Ondupack Navalmoral",
    "Ondupet",
    "Perseida",
    "Rivalcato",
    "Sikno",
    "General",
  ];

  // Cargar datos de la idea cuando se abre el modal
  useEffect(() => {
    if (idea && isOpen) {
      setFormData({
        titulo: idea.titulo,
        descripcion: idea.descripcion,
        categoria: idea.categoria,
        planta: idea.planta,
        archivos:
          idea.archivos?.map((archivo) => ({
            id: Math.random().toString(36).substr(2, 9),
            nombre: archivo.nombre || "Archivo",
            tipo: archivo.tipo || "application/octet-stream",
            tamaño: archivo.tamaño || 0,
            archivo: archivo,
          })) || [],
      });
      setErrores({});
    }
  }, [idea, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error si el campo ya no está vacío
    if (errores[field] && value.trim()) {
      setErrores((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatearTamaño = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const tamaños = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + tamaños[i];
  };

  const obtenerIconoArchivo = (tipo: string) => {
    if (tipo.includes("image"))
      return <Image className="w-4 h-4 text-blue-500" />;
    if (tipo.includes("pdf"))
      return <FileText className="w-4 h-4 text-red-500" />;
    if (tipo.includes("sheet") || tipo.includes("excel"))
      return <Sheet className="w-4 h-4 text-green-500" />;
    if (tipo.includes("word") || tipo.includes("document"))
      return <FileText className="w-4 h-4 text-blue-600" />;
    return <File className="w-4 h-4 text-gray-500" />;
  };

  const procesarArchivos = (archivos: FileList) => {
    const nuevosArchivos: ArchivoAdjunto[] = [];

    Array.from(archivos).forEach((archivo) => {
      // Validar tamaño (máximo 10MB)
      if (archivo.size > 10 * 1024 * 1024) {
        alert(`El archivo ${archivo.name} es demasiado grande. Máximo 10MB.`);
        return;
      }

      const nuevoArchivo: ArchivoAdjunto = {
        id: Math.random().toString(36).substr(2, 9),
        nombre: archivo.name,
        tipo: archivo.type,
        tamaño: archivo.size,
        archivo: archivo,
      };

      nuevosArchivos.push(nuevoArchivo);
    });

    setFormData((prev) => ({
      ...prev,
      archivos: [...prev.archivos, ...nuevosArchivos],
    }));
  };

  const eliminarArchivo = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      archivos: prev.archivos.filter((archivo) => archivo.id !== id),
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files) {
      procesarArchivos(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      procesarArchivos(e.target.files);
    }
  };

  const validar = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.titulo.trim())
      nuevosErrores.titulo = "El título es obligatorio";
    if (!formData.descripcion.trim())
      nuevosErrores.descripcion = "La descripción es obligatoria";
    if (!formData.categoria)
      nuevosErrores.categoria = "Selecciona una categoría";
    if (!formData.planta) nuevosErrores.planta = "Selecciona una planta";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    if (validar()) {
      onSave({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        planta: formData.planta,
        archivos: formData.archivos,
      });
      onClose();
    }
  };

  if (!isOpen || !idea) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bg-300">
          <div>
            <h2 className="text-2xl font-bold text-text-100">Editar Idea</h2>
            <p className="text-sm text-text-200 mt-1">
              Modifica los datos de tu idea • ID: #{idea.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-text-100 mb-2">
              Título de la idea *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              className={`input-field ${
                errores.titulo ? "border-red-300 focus:ring-red-500" : ""
              }`}
            />
            {errores.titulo && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errores.titulo}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-text-100 mb-2">
              Descripción *
            </label>
            <textarea
              rows={4}
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              className={`input-field resize-none ${
                errores.descripcion ? "border-red-300 focus:ring-red-500" : ""
              }`}
            />
            {errores.descripcion && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errores.descripcion}
              </p>
            )}
          </div>

          {/* Categoría y Planta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-100 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Categoría *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleInputChange("categoria", e.target.value)}
                className={`input-field ${
                  errores.categoria ? "border-red-300 focus:ring-red-500" : ""
                }`}
              >
                <option value="">Selecciona la categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              {errores.categoria && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errores.categoria}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-100 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Planta *
              </label>
              <select
                value={formData.planta}
                onChange={(e) => handleInputChange("planta", e.target.value)}
                className={`input-field ${
                  errores.planta ? "border-red-300 focus:ring-red-500" : ""
                }`}
              >
                <option value="">Selecciona la planta</option>
                {plantas.map((planta) => (
                  <option key={planta} value={planta}>
                    {planta}
                  </option>
                ))}
              </select>
              {errores.planta && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errores.planta}
                </p>
              )}
            </div>
          </div>

          {/* Zona de carga de archivos */}
          <div>
            <label className="block text-sm font-medium text-text-100 mb-2">
              Documentos de apoyo
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                dragOver
                  ? "border-accent-100 bg-primary-50"
                  : "border-bg-300 hover:border-accent-100"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <Upload className="w-8 h-8 text-text-200 mx-auto mb-2" />
              <p className="text-sm text-text-200 mb-2">
                Arrastra archivos aquí o{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-accent-100 hover:text-accent-200 font-medium"
                >
                  selecciona archivos
                </button>
              </p>
              <p className="text-xs text-text-200">
                PDF, Excel, Word, imágenes, etc. Máximo 10MB por archivo
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.ppt,.pptx"
              />
            </div>

            {/* Lista de archivos */}
            {formData.archivos.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-text-100">
                  Archivos adjuntos ({formData.archivos.length})
                </p>
                {formData.archivos.map((archivo) => (
                  <div
                    key={archivo.id}
                    className="flex items-center justify-between p-3 bg-bg-100 rounded-lg border border-bg-300"
                  >
                    <div className="flex items-center gap-3">
                      {obtenerIconoArchivo(archivo.tipo)}
                      <div>
                        <p className="text-sm font-medium text-text-100 truncate max-w-xs">
                          {archivo.nombre}
                        </p>
                        <p className="text-xs text-text-200">
                          {formatearTamaño(archivo.tamaño)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarArchivo(archivo.id)}
                      className="p-1 text-text-200 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mensaje informativo */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-yellow-100 rounded-full">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  ⚠️ Importante
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Los cambios se guardarán inmediatamente. Una vez que tu idea
                  esté en proceso avanzado (CoDir, Aprobada, etc.), no podrás
                  editarla.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-bg-300 bg-bg-100">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarIdeaModal;
