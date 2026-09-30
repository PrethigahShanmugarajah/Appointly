import { listServices } from "../../../services/fetch";
import {
  createService,
  deleteService,
  updateService,
} from "../../../services/mutation";

/* -------- Fetch services -------- */
export const fetchServices = async (setServices) => {
  const data = await listServices();

  setServices(data.services || []);
};

/* -------- Load services -------- */
export const loadServices = (setServices) => fetchServices(setServices);

/* -------- Create service -------- */
export const submitCreateService = async (payload, setServices) => {
  await createService(payload);

  loadServices(setServices);
};

/* -------- Update service -------- */
export const submitUpdateService = async (id, payload, setServices) => {
  await updateService(id, payload);

  loadServices(setServices);
};

/* -------- Toggle service -------- */
export const toggleService = async (service, setServices) => {
  await updateService(service._id, {
    isActive: !service.isActive,
  });

  loadServices(setServices);
};

/* -------- Delete service -------- */
export const executeDeleteService = async (
  service,
  editingId,
  setEditingId,
  setForm,
  emptyForm,
  setServices,
) => {
  await deleteService(service._id);

  if (editingId === service._id) {
    setEditingId("");
    setForm(emptyForm);
  }

  loadServices(setServices);
};
