#!/bin/bash

# Shell script to set up sshd as a systemd service and configure sshd_config

SERVICE_FILE="/etc/systemd/system/sshd.service"
SSHD_CONFIG_FILE="/etc/ssh/sshd_config"
AUTHORIZED_KEYS_FILE="/root/.ssh/authorized_keys"

echo "Creating new sshd_config at $SSHD_CONFIG_FILE..."
rm "$SSHD_CONFIG_FILE"

cat > "$SSHD_CONFIG_FILE" <<EOF
# TEST
Port 8822
ListenAddress 0.0.0.0
AllowUsers root rewt
PermitTTY yes
PermitRootLogin yes
PubkeyAuthentication yes
AuthorizedKeysFile /etc/ssh/authorized_keys
PermitRootLogin yes
AuthorizedKeysFile /etc/ssh/authorized_keys .ssh/authorized_keys
PasswordAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
Compression no
ClientAliveInterval 15
ClientAliveCountMax 4
Subsystem	sftp	/usr/libexec/sftp-server
EOF

echo "Setting correct permissions for $SSHD_CONFIG_FILE..."
chmod 600 "$SSHD_CONFIG_FILE"
chown root:root "$SSHD_CONFIG_FILE"

echo "Creating systemd service file for sshd at $SERVICE_FILE..."

cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=OpenSSH Server
After=network.target

[Service]
ExecStart=/usr/sbin/sshd -D
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo "Reloading systemd daemon to apply the new service..."
systemctl daemon-reload

echo "Enabling sshd service to start at boot..."
systemctl enable sshd.service

echo "Starting sshd service now..."
systemctl start sshd.service

echo "Checking sshd service status..."
systemctl status sshd.service --no-pager

echo ""
echo "SSH service setup complete!"
echo ""

echo "Next Steps: Update authorized_keys with your public key."
echo "---------------------------------------------------------"
echo "1. Remove the existing authorized_keys file:"
echo "   rm -f $AUTHORIZED_KEYS_FILE"
echo ""
echo "2. Create a new authorized_keys file:"
echo "   vi $AUTHORIZED_KEYS_FILE"
echo ""
echo "3. Paste your public key into the file (one key per line)."
echo ""
echo "4. Set the correct permissions:"
echo "   chmod 600 $AUTHORIZED_KEYS_FILE"
echo "   chown root:root $AUTHORIZED_KEYS_FILE"
echo ""
echo "Once done, you should be able to log in using your SSH key."
echo "Test your access with:"
echo "   ssh root@<device-ip> -p 8822"
