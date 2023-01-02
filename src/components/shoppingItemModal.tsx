import React, { useCallback, useEffect, useRef } from "react";

interface ShoppingItemModalProps {
  onShoppingItemAdd: (name: string) => void;
}

const ShoppingItemModal = (props: ShoppingItemModalProps) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(() => {
    if (!nameRef.current?.value) return;

    const itemName = nameRef.current.value;
    nameRef.current.value = "";
    props.onShoppingItemAdd(itemName);
  }, [props, nameRef]);

  const onCancel = useCallback(() => {
    if (!nameRef.current?.value) return;

    nameRef.current.value = "";
  }, [nameRef]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!modalCheckboxRef.current?.checked) return;

    if (event.key === "Escape") {
      onCancel();
      modalCheckboxRef.current.checked = false;
    } else if (event.key === "Enter") {
      onSubmit();
      modalCheckboxRef.current.checked = false;
    }
  }, [modalCheckboxRef, onSubmit, onCancel]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <label htmlFor="my-modal" className="btn btn-primary mt-10">Add Shopping Item</label>

      <input ref={modalCheckboxRef}
             type="checkbox"
             id="my-modal"
             className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Shopping Item</h3>
          <p className="py-4">Enter data for new shopping item!</p>
          <input type="text"
                 ref={nameRef}
                 placeholder="Enter name"
                 className="input input-bordered input-primary w-full max-w-xs"
          />
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-outline btn-secondary" onClick={onCancel}>
              Cancel
            </label>
            <label htmlFor="my-modal" className="btn btn-primary" onClick={onSubmit}>
              Add
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingItemModal;