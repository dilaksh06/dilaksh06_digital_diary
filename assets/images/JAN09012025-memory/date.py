import os
from datetime import datetime

def rename_images_in_folder(folder_path):
    # Check if the folder exists
    if not os.path.exists(folder_path):
        print(f"Folder '{folder_path}' does not exist.")
        return

    # List all files in the folder
    files = os.listdir(folder_path)
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
    image_files = [f for f in files if f.lower().endswith(image_extensions)]

    if not image_files:
        print("No image files found in the folder.")
        return

    # Get today's date in the desired format
    today = datetime.now()
    date_prefix = today.strftime("%B_%d_%Y")  # e.g., "December_18_2024"

    # Rename files
    for count, file_name in enumerate(image_files, start=1):
        old_path = os.path.join(folder_path, file_name)
        extension = os.path.splitext(file_name)[1]  # Get the file extension
        new_name = f"{date_prefix}_{count}{extension}"  # New file name
        new_path = os.path.join(folder_path, new_name)

        try:
            os.rename(old_path, new_path)
            print(f"Renamed: '{file_name}' -> '{new_name}'")
        except Exception as e:
            print(f"Error renaming '{file_name}': {e}")

# Specify the folder path
folder_path = "C:/xampp/htdocs/dilaksh06_digital_diary/assets/images/JAN09012025-memory"

# Call the function
rename_images_in_folder(folder_path)
