// src/service/imageUpload.js
import supabase from "../config/supabaseClient.js";
import fs from "fs";

/**
 * Upload a file to Supabase Storage
 * @param {Object} params - Upload parameters
 * @param {string} params.bucketName - Supabase storage bucket name
 * @param {string} params.key - File path/key in the bucket
 * @param {string} params.filePath - Local path to the file
 * @param {string} params.contentType - MIME type of the file
 */
export const supabaseFileUpload = async ({ bucketName, key, filePath, contentType }) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(key, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      throw new Error("Upload failed: " + error.message);
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(key);

    return {
      secure_url: publicUrlData.publicUrl,
    };
  } catch (err) {
    console.error("❌ Error uploading file:", err.message);
    throw err;
  }
};

/**
 * Delete a file from Supabase Storage
 * @param {Object} params - Delete parameters
 * @param {string} params.bucketName - Supabase storage bucket name
 * @param {string} params.key - File path/key to delete
 */
export const supabaseDeleteFile = async ({ bucketName, key }) => {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([key]);
    if (error) {
      throw new Error("Delete failed: " + error.message);
    }
    return true;
  } catch (err) {
    console.error("❌ Error deleting file:", err.message);
    throw err;
  }
};
