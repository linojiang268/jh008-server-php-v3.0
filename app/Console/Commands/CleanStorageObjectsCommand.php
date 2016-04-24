<?php
namespace Jihe\Console\Commands;

use Illuminate\Console\Command;
use Jihe\Contracts\Services\Storage\StorageService;
use Symfony\Component\Console\Input\InputOption;

class CleanStorageObjectsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'storage:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean files in storage.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(StorageService $storageService)
    {

        try {
            $this->scanDir('', null, $storageService);
            echo "clean storage objects successfully\n";
        } catch (\Exception $e) {
            echo "clean failed: " . $e->getTraceAsString() . "\n";
        }
    }

    private function scanDir($prefix, $marker, StorageService $storageService)
    {
        $rst = $storageService->listObjects($prefix, [
            'max_keys' => 1,
            'marker'   => $marker,
        ]);

        $nextMarker = $rst['next_marker'];
        $objects = $rst['objects'];

        if (!empty($objects)) {
            $object = $objects[0];
            if ($object['folder']) {
                $this->scanDir($object['original_name'], null, $storageService);
                // remove folder is not supported
                // expected remove folder when 23:59:59 over expired time line
                $storageService->remove($object['original_name']);
                echo 'removed folder: ' . $object['original_name'] . "\n";
            } else {
                $storageService->remove($object['original_name']);
                echo 'removed object: ' . $object['original_name'] . "\n";
            }
        }

        if (is_null($nextMarker)) {
            return;
        }

        $this->scanDir($prefix, $nextMarker, $storageService);
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [

        ];
    }
}