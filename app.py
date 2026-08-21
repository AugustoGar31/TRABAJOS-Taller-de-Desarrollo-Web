import random

def girar_ruleta():
	return random.randint(1, 100)

def main():
	print(f"La ruleta eligio el numero: {girar_ruleta()}")