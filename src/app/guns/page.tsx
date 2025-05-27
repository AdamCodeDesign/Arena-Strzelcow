"use client";

import React, { useState } from "react";

const CreateGunPage: React.FC = () => {
    const [gunName, setGunName] = useState("");
    const [caliber, setCaliber] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        const newGun = {
            name: gunName,
            type,
            caliber,
            manufacturer,
        };

        try {
            const response = await fetch("/api/guns", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGun),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(
                    errorData.error ||
                        "Failed to create gun. Please try again.",
                );
                return;
            }

            const createdGun = await response.json();
            console.log("Gun Created:", createdGun);
            setSuccessMessage("Gun created successfully!");
            setGunName("");
            setType("");
            setCaliber("");
            setManufacturer("");
        } catch (err) {
            console.error("Error creating gun:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const labelStyle = "block text-white font-medium mb-1";
    const inputStyle =
        "w-full p-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500";
    return (
        <div className="p-6 bg-grey-700 min-h-screen">
            <h1 className="text-2xl font-bold text-white mb-4">
                Create Gun
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="gunName"
                        className={labelStyle}>
                        Gun Name:
                    </label>
                    <input
                        id="gunName"
                        type="text"
                        value={gunName}
                        onChange={(e) => setGunName(e.target.value)}
                        className={inputStyle}
                    />
                </div>
                <div>
                    <label
                        htmlFor="type"
                        className={labelStyle}>
                        Type:
                    </label>
                    <input
                        id="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className={inputStyle}
                    />
                </div>
                <div>
                    <label
                        htmlFor="caliber"
                        className={labelStyle}>
                        Caliber:
                    </label>
                    <input
                        id="caliber"
                        type="text"
                        value={caliber}
                        onChange={(e) => setCaliber(e.target.value)}
                        className={inputStyle}
                    />
                </div>
                <div>
                    <label
                        htmlFor="manufacturer"
                        className={labelStyle}>
                        Manufacturer:
                    </label>
                    <input
                        id="manufacturer"
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className={inputStyle}
                    />
                </div>
                <button
                    type="submit"
                    className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                        isSubmitting
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-400 text-gray-700 hover:bg-white hover:text-gray-700 hover:cursor-pointer"
                    }`}
                    disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Gun"}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {successMessage && (
                <div className="mt-4">
                    <p className="text-gray-600">{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default CreateGunPage;
