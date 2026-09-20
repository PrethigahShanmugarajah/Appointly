// Client / src / pages / Service / View / Service.jsx
import { useEffect, useState } from "react";
import { emptyForm } from "../../../utils/service";
import {
  executeDeleteService,
  loadServices,
  submitCreateService,
  submitUpdateService,
  toggleService,
} from "../Services/ServiceServices";
import { toast } from "react-toastify";
import AppLayout from "../../../components/AppLayout";
import ServiceForm from "../Components/ServiceForm";
import ServiceList from "../Components/ServiceList";
import ConfirmPopup from "../../../components/ConfirmPopup";

const Service = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadServices(setServices);
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      };

      if (editingId) {
        await submitUpdateService(editingId, payload, setServices);
      } else {
        await submitCreateService(payload, setServices);
      }

      setForm(emptyForm);
      setEditingId("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save services.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleService = async (service) => {
    await toggleService(service, setServices);
  };

  const startEditing = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description || "",
      icon: service.icon || "C1.png",
    });
  };

  const cancelEditing = () => {
    setEditingId("");
    setForm(emptyForm);
  };

  const confirmDelete = (service) => {
    setDeleteConfirm(service);
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await executeDeleteService(
        deleteConfirm,
        editingId,
        setEditingId,
        setForm,
        emptyForm,
        setServices,
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete service.");
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <AppLayout>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* -------- Left: Form -------- */}
        <ServiceForm
          form={form}
          editingId={editingId}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setForm={setForm}
          cancelEditing={cancelEditing}
        />

        {/* -------- Right : Service List -------- */}
        <ServiceList
          services={services}
          handleToggleService={handleToggleService}
          startEditing={startEditing}
          confirmDelete={confirmDelete}
        />
      </div>

      {/* -------- Delete Confirmation Modal -------- */}
      {deleteConfirm && (
        <ConfirmPopup
          showCloseIcon={false}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={executeDelete}
          loading={loading}
          item={deleteConfirm?.name}
          title="Delete Service"
          description={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteConfirm?.name}</span>?
              <br />
              Existing bookings will remain, but customers will no longer be
              able to book this service.
              <br />
              This action cannot be undone.
            </>
          }
          confirmText="Delete Service"
          closeText="Cancel"
        />
      )}
    </AppLayout>
  );
};

export default Service;
