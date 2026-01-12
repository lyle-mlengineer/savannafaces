from oryks_google_drive import GoogleDrive
from pwdlib import PasswordHash

import logging

from app.core.config import config

drive = GoogleDrive()
password_hash = PasswordHash.recommended()