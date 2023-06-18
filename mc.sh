mc alias set myminio http://127.0.0.1:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

mc admin user add myminio ${MINIO_ACCESS_KEY} ${MINIO_SECRET_KEY}
