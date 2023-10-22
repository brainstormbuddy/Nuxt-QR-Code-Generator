const showToast = (toast, config) => {
  console.log("showToast");
  toast.add(config);
};

// {
//     severity: "success",
//     summary: "Transacción Exitosa",
//     detail: "Se han guardado los datos correctamente",
//     life: 3000,
//   }

export { showToast };
