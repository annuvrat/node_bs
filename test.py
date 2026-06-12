s = 'madaam'

def palindrome(s):
    chars = list(s)
    left = 0
    right = len(s)-1
    result = []

    while left<right:
        if chars[left] != chars[right]:
            return False
        left += 1
        right -= 1
    return True


print(palindrome(s))

    
