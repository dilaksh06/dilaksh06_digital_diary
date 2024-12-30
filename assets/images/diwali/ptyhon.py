import os
import json

# Function to read all files in a folder and save them in JSON-like structure
def save_file_names_to_json(folder_path, output_file):
    try:
        # List all files in the folder
        files = [f"./assets/images/diwali/{f}" for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

        # Create a dictionary with the "photos" key
        data = {
            "photos": files
        }

        # Convert the dictionary to a JSON string
        json_data = json.dumps(data, indent=4)

        # Write the JSON string to the output file
        with open(output_file, "w") as file:
            file.write(json_data)

        print(f"File names have been saved to {output_file}.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
if __name__ == "__main__":
    folder_path = "C:/xampp/htdocs/dilaksh06_digital_diary/assets/images/diwali" # Replace with your folder path
    output_file = "output.txt"  # Output text file name

    save_file_names_to_json(folder_path, output_file)
