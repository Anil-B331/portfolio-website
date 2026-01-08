from PIL import Image
import sys

def remove_background():
    try:
        # Load the image
        img_path = 'assets/profile-blob.png'
        print(f"Loading {img_path}...")
        img = Image.open(img_path).convert("RGBA")
        datas = img.load()
        width, height = img.size
        
        # We will use a flood fill algorithm from the corners to remove the background
        # The background is a checkerboard, so it consists of two distinct colors usually.
        # But since it's a generated image, there might be compression artifacts.
        # We'll assume the blob is centered and the corners are definitely background.
        
        # Set of visited pixels
        visited = set()
        stack = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        # Get background colors samples from corners
        bg_samples = []
        for x, y in stack:
            bg_samples.append(datas[x, y])
            
        print(f"Background samples: {bg_samples}")
        
        # Threshold for color similarity (to handle compression artifacts)
        threshold = 30
        
        def is_bg_color(r, g, b, a):
            # Check if this pixel is similar to any of our start corner pixels
            # The checkerboard is usually white (255,255,255) and gray (200-220ish)
            # But the purple blob is very different.
            
            # Simple heuristic: The blob is PURPLE. The background is GRAY/WHITE.
            # Purple has high Blue and Red, low Green. Gray/White has R~=G~=B.
            
            # If R, G, B are close to each other, it's likely gray/white.
            if abs(r - g) < threshold and abs(g - b) < threshold and abs(r - b) < threshold:
                return True
            return False

        while stack:
            x, y = stack.pop()
            
            if (x, y) in visited:
                continue
            
            visited.add((x, y))
            
            if not (0 <= x < width and 0 <= y < height):
                continue
                
            r, g, b, a = datas[x, y]
            
            # If it's already transparent, we might still need to traverse
            if a == 0:
                pass 
            elif is_bg_color(r, g, b, a):
                # Make transparent
                datas[x, y] = (0, 0, 0, 0)
            else:
                # It's not background (hit the blob), stop traversing this path
                continue
                
            # Add neighbors
            neighbors = [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]
            for nx, ny in neighbors:
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    stack.append((nx, ny))

        output_path = 'assets/profile-clean.png'
        img.save(output_path)
        print(f"Saved cleaned image to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_background()
