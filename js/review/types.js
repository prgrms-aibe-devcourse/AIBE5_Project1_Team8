export function initTravelerType(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return null;

    const tags = group.querySelectorAll('.type-tag');
    let selectedValue = null;

    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            tags.forEach((t) => t.classList.remove('active'));
            tag.classList.add('active');
            selectedValue = tag.getAttribute('data-value');
        });
    });

    return {
        getSelectedValue: () => selectedValue,
        // [추가] 외부에서 수동으로 값을 설정하는 함수
        setSelectedValue: (value) => {
            selectedValue = value;
            tags.forEach(t => {
                if (t.getAttribute('data-value') === value) t.classList.add('active');
                else t.classList.remove('active');
            });
        }
    };
}