<template>
<div class="wrapper">
    <div :id="elementId" class="scanner"></div>
    <div v-if="!isScanning && !isLoading" class="overlay">
        <NButton type="primary" round @click="startScan">Avvia Fotocamera</NButton>
    </div>
</div>
</template>

<script lang="ts" setup>
import { Html5Qrcode, Html5QrcodeSupportedFormats, type Html5QrcodeCameraScanConfig } from 'html5-qrcode';
import { NButton } from 'naive-ui';

const props = withDefaults(defineProps<{
    qrbox?: number | { width: number, height: number };
    fps?: number;
    verbose?: boolean;
    //formats?: Html5QrcodeSupportedFormats[];
}>(), {
    qrbox: 250,
    fps: 10,
    verbose: false
});

const emit = defineEmits<{
    (e: "detect", decodedText: string, decodedResult: any): void;
    (e: "init-error", error: any): void;
}>();

const elementId = useId()
const scanner = ref<Html5Qrcode | null>(null);
const isScanning = ref(false);
const isLoading = ref(true);
const errorMessage = ref('');

const startScan = async () => {
    if (!scanner.value || isScanning.value) return;

    isLoading.value = true;
    errorMessage.value = '';

    const config: Html5QrcodeCameraScanConfig = {
        fps: props.fps,
        qrbox: props.qrbox,
        aspectRatio: 1.3333
    };

    try {
        // start() arguments: cameraIdOrConfig, config, onScanSuccess, onScanFailure
        await scanner.value.start(
            { facingMode: "environment" }, // Prefer back camera
            config,
            (decodedText, decodedResult) => {
                emit("detect", decodedText, decodedResult);
            },
            (errorMessage) => {
                // This fires on every frame where no QR is detected.
                // We usually ignore this to keep the console clean.
            }
        );
        isScanning.value = true;
    } catch (err: any) {
        emit("init-error", err);
        console.error("Error starting scanner", err);

        // Specific user-friendly messages
        if (err?.name === 'NotAllowedError') {
            errorMessage.value = "Accesso alla fotocamera negato. Controlla le impostazioni.";
        } else if (err?.name === 'NotFoundError') {
            errorMessage.value = "Nessuna fotocamera trovata.";
        }
    } finally {
        isLoading.value = false;
    }
};

const stopScan = async () => {
    if (!scanner.value || !isScanning.value) return;

    try {
        await scanner.value.stop();
        isScanning.value = false;
        // Clearing removes the canvas overlay and video element
        scanner.value.clear();
    } catch (err) {
        console.error("Failed to stop scanner", err);
    }
};

defineExpose({
    pauseScanner: async () => {
        if (!scanner.value || !isScanning.value) return;

        try {
            await scanner.value.pause();
        } catch (err) {
            console.error("Failed to pause scanner", err);
        }
    },
    resumeScanner: async () => {
        if (!scanner.value || !isScanning.value) return;

        try {
            await scanner.value.resume();
        } catch (err) {
            console.error("Failed to resume scanner", err);
        }
    }
});

onMounted(() => {
    scanner.value = new Html5Qrcode(elementId, false);
    startScan();

    /* const config = {
        fps: props.fps,
        qrbox: props.qrbox,
        aspectRatio: 1.3333,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        formatsToSupport: props.formats
    };

    scanner.value = new Html5QrcodeScanner(elementId, config, props.verbose);
    scanner.value.render(onScanSuccess, onScanFailure); */
});
onUnmounted(async () => {
    if (isScanning.value) {
        await stopScan();
    }
});
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    &:deep(.scanner) {
    width: 100%;
    height: 100%;

        &>div:not(#qr-shaded-region) {
            display: none !important;
        }
    }
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: white;
    z-index: 10;
    padding: 20px;
}
</style>