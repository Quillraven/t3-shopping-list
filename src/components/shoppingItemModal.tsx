import type { FormEvent } from "react";
import React, { useCallback, useEffect, useState } from "react";

interface ShoppingItemModalProps {
  onShoppingItemAdd: (name: string) => void;
}

const ShoppingItemModal = (props: ShoppingItemModalProps) => {

  const [visible, setVisible] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>, form: HTMLFormElement) => {
    event?.preventDefault();

    const nameInp = form.elements.namedItem("itemNameInput") as HTMLInputElement;
    if (!nameInp.value) return false;

    props.onShoppingItemAdd(nameInp.value);
    setVisible(false);
    return true;
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!visible) return;

    if (event.key === "Escape") {
      setVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <button className="btn btn-primary mt-10" onClick={() => setVisible(true)}>
        Add Shopping Item
      </button>

      {visible &&
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Shopping Item</h3>
          <p className="py-4">Enter data for new shopping item!</p>
          <form onSubmit={(event) => onSubmit(event, event.currentTarget)}>
            <input type="text"
                   name={"itemNameInput"}
                   placeholder="Enter name"
                   className="input input-bordered input-primary w-full max-w-xs"
                   autoFocus={true}
            />
            <div className="modal-action">
              <button type={"reset"} className="btn btn-outline btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type={"submit"} className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default ShoppingItemModal;