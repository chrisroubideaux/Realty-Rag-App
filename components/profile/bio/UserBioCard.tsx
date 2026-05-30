// components/profile/bio/UserBioCard.tsx

// components/profile/bio/UserBioCard.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiEdit3,
  FiHome,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUser,
  FiX,
} from "react-icons/fi";

export type EditableUserFieldKey =
  | "full_name"
  | "email"
  | "phone_number"
  | "user_type"
  | "preferred_city"
  | "preferred_state";

type UserBioCardProps = {
  fullName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  userType?: string | null;
  preferredCity?: string | null;
  preferredState?: string | null;
  isActive?: boolean;
  onSaveField: (field: EditableUserFieldKey, value: string) => Promise<void>;
};

type EditableFieldProps = {
  label: string;
  field: EditableUserFieldKey;
  value: string;
  icon: React.ReactNode;
  type?: "text" | "email" | "tel";
  placeholder: string;
  onSaveField: (field: EditableUserFieldKey, value: string) => Promise<void>;
};

export default function UserBioCard({
  fullName = "",
  email = "",
  phoneNumber = "",
  userType = "buyer",
  preferredCity = "",
  preferredState = "",
  isActive = true,
  onSaveField,
}: UserBioCardProps) {
  const displayName = fullName?.trim() || "User";

  return (
    <motion.section
      className="admin-bio-card glass-card-strong"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="admin-bio-card__header">
        <div className="admin-bio-card__avatar">
          <FiUser />
        </div>

        <div>
          <span className="admin-bio-card__kicker">User Profile</span>
          <h2>{displayName}</h2>

          <div className="admin-bio-card__meta">
            <span>{userType || "buyer"}</span>
            <span className={isActive ? "is-active" : "is-inactive"}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="admin-bio-card__fields">
        <EditableField
          label="Full Name"
          field="full_name"
          value={fullName || ""}
          icon={<FiUser />}
          placeholder="Enter full name"
          onSaveField={onSaveField}
        />

        <EditableField
          label="Email"
          field="email"
          value={email || ""}
          icon={<FiMail />}
          type="email"
          placeholder="Enter email address"
          onSaveField={onSaveField}
        />

        <EditableField
          label="Phone"
          field="phone_number"
          value={phoneNumber || ""}
          icon={<FiPhone />}
          type="tel"
          placeholder="Enter phone number"
          onSaveField={onSaveField}
        />

        <EditableField
          label="User Type"
          field="user_type"
          value={userType || ""}
          icon={<FiHome />}
          placeholder="buyer, seller, renter, investor"
          onSaveField={onSaveField}
        />

        <EditableField
          label="Preferred City"
          field="preferred_city"
          value={preferredCity || ""}
          icon={<FiMapPin />}
          placeholder="Enter preferred city"
          onSaveField={onSaveField}
        />

        <EditableField
          label="Preferred State"
          field="preferred_state"
          value={preferredState || ""}
          icon={<FiMapPin />}
          placeholder="Enter preferred state"
          onSaveField={onSaveField}
        />
      </div>
    </motion.section>
  );
}

function EditableField({
  label,
  field,
  value,
  icon,
  type = "text",
  placeholder,
  onSaveField,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  const handleCancel = () => {
    setDraftValue(value);
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      await onSaveField(field, draftValue.trim());

      setIsEditing(false);
      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 1400);
    } catch (err) {
      console.error(`Failed to save ${field}:`, err);
      setError("Could not save this field.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-bio-field">
      <div className="admin-bio-field__icon">{icon}</div>

      <div className="admin-bio-field__content">
        <label>{label}</label>

        {isEditing ? (
          <input
            type={type}
            value={draftValue}
            placeholder={placeholder}
            onChange={(event) => setDraftValue(event.target.value)}
          />
        ) : (
          <p>{value || "Not added yet"}</p>
        )}

        {error && <small className="admin-bio-field__error">{error}</small>}
      </div>

      <div className="admin-bio-field__actions">
        {saved && (
          <span className="admin-bio-field__saved">
            <FiCheck />
          </span>
        )}

        {isEditing ? (
          <>
            <button
              type="button"
              className="admin-bio-field__save"
              onClick={handleSave}
              disabled={saving}
              title={`Save ${label}`}
            >
              <FiSave />
              <span>{saving ? "Saving..." : "Save"}</span>
            </button>

            <button
              type="button"
              className="admin-bio-field__cancel"
              onClick={handleCancel}
              disabled={saving}
              title={`Cancel ${label} edit`}
            >
              <FiX />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="admin-bio-field__edit"
            onClick={() => setIsEditing(true)}
            title={`Edit ${label}`}
          >
            <FiEdit3 />
            <span>Edit</span>
          </button>
        )}
      </div>
    </div>
  );
}