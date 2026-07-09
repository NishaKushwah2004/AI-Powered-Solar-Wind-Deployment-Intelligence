import Button from "../ui/Button";

export default function DeleteConfirmationModal({

    isOpen,

    title,

    message,

    onCancel,

    onConfirm,

}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-bold">

                    {title}

                </h2>

                <p className="mt-4 text-slate-600">

                    {message}

                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <Button
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>

                </div>

            </div>

        </div>

    );

}