# Tool evidence — npve-family-history-edit (2026-09-10)

Authenticated tools discovered in this session (VS Code Copilot, Figma MCP):

- `mcp_figma_mcp_ser_get_metadata` — used live on fdCQVFdvOByaOYIJYag0d6 (document root + page 3:2). PASS.
- `mcp_figma_mcp_ser_get_screenshot` — used earlier this session against zVsuhYehoSLLq880qRBFkq node 129:12486. PASS.
- `mcp_figma_mcp_ser_download_assets` — activated and used this session: exported 129:12486 at PNG scale 2 (64,766 bytes) and saved as `reference-2x-129-12486.png` in this folder. PASS.
- `mcp_figma_mcp_ser_upload_assets` — activated and available; used at build time to place the frozen reference into the target file.
- `mcp_figma_mcp_ser_use_figma` — available for canvas writes on the target file; first authorized edit and readback will verify write permission per the execution policy.

Read-only policy: zVsuhYehoSLLq880qRBFkq (source) and YX2n4YLrEpBXNbcc73T6dw (library) are never written. All writes target fdCQVFdvOByaOYIJYag0d6 with the file key passed explicitly on every call.

## Control mappings (reused from the Allergies edit, npveRebuild_allergiesEdit_2026-09-09)

Saved readback: `controls-snapshot.json` (from the Allergies live-audit.json, same session lineage, same library file). The validator checks these against the saved native `componentPropertyDefinitions`.

| Control | Component | Key evidence |
|---|---|---|
| Relationship autocomplete | Autocomplete/Field 616:14502, key 0f2922e41ee4f1d7940987e9bf1b1797e19a0e1e | Allergies Allergen instance 616:15026 read back with size=small, State=Default, Value=Filled, Label, Value text, Clear icon props |
| Status radio row | Form control label 197:3282, key 9821b1c515db0ecc146dd21d2bcca3961aef1424 | Allergies Active/Inactive instances read back; Control#140:3 is an INSTANCE_SWAP slot (Radio 389:3445 checked / 389:3441 unchecked) |
| Age field | Text field 77:708, key 542540ea8fa199c81ea0128aea9c78a5cc8e8abf | Allergies Add-reaction input read back (size=small, Value=Empty/Filled, Label, Value text) |
| Condition list row | Text field 77:709, key 679a3842ec3982166e616a8f294684199e2e5c94 | Allergies reaction rows read back (Value=Filled, Show helper=false) |
| Add button | Button 155:1193, key 8fc8f57f80196e40aff7b3b1116226ea0a925120 | Allergies Add instance read back: variant=contained, color=primary, size=small, 64x30 — the published white bordered small control (no outlined variant exists; recorded mapping correction) |
| Comments | Text field 77:698, key ee985b01789ea929c155aac26f9cd55370bb057e | Allergies Comments read back (size=medium, multiline=true, Value=Empty, 104 tall) |
| Trash | Icon button 77:1109 color=default size=small with Icon/TrashOutlined 389:3433 | runs 2-3 and Allergies precedent |
| Error X | Icon button color=error size=small with Icon/Close | recorded GAP wrapper pattern 324:4934 / 394:5611, reused in Allergies 629:14701/629:14724 |

## Corrections

None yet. The one known planning correction (outlined 36px Add → published contained/primary small 30px) was resolved in the Allergies batch and is carried forward as the verified mapping.