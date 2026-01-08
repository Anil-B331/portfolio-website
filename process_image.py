from PIL import Image, ImageOps

def create_blob_profile():
    try:
        # Load images
        blob = Image.open('assets/blob-ref.png').convert("RGBA")
        profile = Image.open('assets/profile-raw.jpg').convert("RGBA")

        # Get the alpha channel of the blob to use as mask
        # If the blob is just a colored shape on white/transparent, we might need to process it.
        # Assuming the uploaded PNG has transparency. If not, we might need to key out the white background.
        
        # Let's assume the blob image has transparency for the shape. 
        # If the blob is solid color on transparent bg, the alpha channel is our mask.
        mask = blob.split()[3]
        
        # Calculate aspect ratios to center crop the profile to fit the blob
        blob_w, blob_h = blob.size
        
        # Resize/Crop profile to fill the blob dimensions
        profile_filled = ImageOps.fit(profile, (blob_w, blob_h), centering=(0.5, 0.5))
        
        # Create a new blank image
        final_image = Image.new("RGBA", (blob_w, blob_h), (0, 0, 0, 0))
        
        # Paste the profile using the blob's alpha as mask
        final_image.paste(profile_filled, (0, 0), mask=mask)
        
        final_image.save('assets/profile-final.png')
        print("Successfully created assets/profile-final.png")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_blob_profile()
