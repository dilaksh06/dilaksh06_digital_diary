import os

def rename_images():
    # Get the current working directory
    current_folder = os.getcwd()

    # Supported image extensions
    image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.tiff']

    # Get a list of all files in the folder
    files = os.listdir(current_folder)

    # Filter the files to include only images
    images = [file for file in files if os.path.splitext(file)[1].lower() in image_extensions]

    # Sort the images by their current names (optional, ensures consistency)
    images.sort()

    # Rename the images
    for index, image in enumerate(images):
        # Get the file extension
        _, extension = os.path.splitext(image)

        # Create the new name
        new_name = f"P{index + 1}{extension}"

        # Rename the file
        old_path = os.path.join(current_folder, image)
        new_path = os.path.join(current_folder, new_name)

        os.rename(old_path, new_path)

        print(f"Renamed: {image} -> {new_name}")

if __name__ == "__main__":
    rename_images()
