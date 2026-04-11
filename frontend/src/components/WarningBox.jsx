export default function WarningBox({ warning }) {
    if (!warning) return null;

    return (
        <div className="bg-red-100 text-red-800 p-4 rounded-xl">
            <strong>⚠️ Warning:</strong> {warning}
        </div>
    );
}